import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type College = {
  id: string;
  name: string;
  slug: string;
};

export default function CollegeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('id, name, slug')
        .order('name', { ascending: true });

      if (!error && data) {
        setColleges(data);
      }
      setLoading(false);
    };

    fetchColleges();
  }, []);

  return (
    <select
      className="p-2 border rounded-lg bg-white text-quickpens-navy w-full max-w-xs"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
    >
      <option value="">Select Your College</option>
      {colleges.map((college) => (
        <option key={college.id} value={college.slug}>
          {college.name}
        </option>
      ))}
    </select>
  );
}