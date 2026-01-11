type MetricsCardProps = {
  title: string;
  value: string | number;
};


export default function MetricsCard({ title, value }: MetricsCardProps) {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

