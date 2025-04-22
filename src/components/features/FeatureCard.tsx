
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
}

const FeatureCard = ({ icon, title, description, iconBgColor }: FeatureCardProps) => {
  return (
    <Card className="card-hover border-0 shadow-md">
      <CardHeader className="pb-2">
        <div className={`rounded-full w-14 h-14 flex items-center justify-center ${iconBgColor} mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base font-normal text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default FeatureCard;
