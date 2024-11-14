interface DashboardCardProps {
  title: string;
  metric: number;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  Icon,
  metric,
  title,
}) => {
  return (
    <div className="relative bg-white dark:bg-black dark:border-gray-500 dark:border-opacity-40 max-w-md p-6 h-[10rem] cursor-pointer border rounded-lg">
      <p className="dark:text-gray-400 text-gray-600 mb-5 text-sm font-medium ">
        {title}
      </p>
      <h4 className="text-3xl text-primary font-semibold ">{metric}</h4>
      <div className="bg-white  dark:bg-gray-900 rounded-full border-2 border-primary  absolute -right-5 flex justify-center items-center -top-5 h-[3.5rem] w-[3.5rem]">
        <Icon className="size-5 text-primary" />
      </div>
    </div>
  );
};
