-- Drop existing table if exists
drop table if exists public.assignment_claims;

-- Create assignment_claims table
create table public.assignment_claims (
    id uuid default gen_random_uuid() primary key,
    assignment_id uuid references public.assignments(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    user_email text not null,
    user_contact text,
    status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Add constraint to ensure only one accepted claim per assignment
create unique index one_accepted_claim_per_assignment
    on public.assignment_claims (assignment_id)
    where status = 'accepted';

-- Add RLS policies
alter table public.assignment_claims enable row level security;

-- Writers can view their own claims
create policy "Writers can view their own claims"
    on public.assignment_claims
    for select
    using (auth.uid() = user_id);

-- Writers can create claims
create policy "Writers can create claims"
    on public.assignment_claims
    for insert
    with check (auth.uid() = user_id);

-- Writers can delete their own claims
create policy "Writers can delete their own claims"
    on public.assignment_claims
    for delete
    using (auth.uid() = user_id);

-- Assignment owners can view claims
create policy "Assignment owners can view claims"
    on public.assignment_claims
    for select
    using (
        exists (
            select 1 from public.assignments
            where assignments.id = assignment_claims.assignment_id
            and assignments.created_by = auth.uid()
        )
    );

-- Assignment owners can update claims
create policy "Assignment owners can update claims"
    on public.assignment_claims
    for update
    using (
        exists (
            select 1 from public.assignments
            where assignments.id = assignment_claims.assignment_id
            and assignments.created_by = auth.uid()
        )
    );

-- Assignment owners can delete claims
create policy "Assignment owners can delete claims"
    on public.assignment_claims
    for delete
    using (
        exists (
            select 1 from public.assignments
            where assignments.id = assignment_claims.assignment_id
            and assignments.created_by = auth.uid()
        )
    );

-- Create trigger to update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for updated_at
create trigger handle_updated_at
    before update on public.assignment_claims
    for each row
    execute procedure public.handle_updated_at();
