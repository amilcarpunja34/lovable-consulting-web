
interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    imageUrl: string;
    featured: boolean;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div
      className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-100 dark:border-slate-700 m-3 h-full flex flex-col transform transition-transform hover:scale-[1.02]"
    >
      <div className="mb-4">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-blue opacity-70"
        >
          <path
            d="M15 12H9C7.34315 12 6 13.3431 6 15V21C6 22.6569 7.34315 24 9 24H15C16.6569 24 18 22.6569 18 21V15C18 13.3431 16.6569 12 15 12Z"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M30 12H24C22.3431 12 21 13.3431 21 15V21C21 22.6569 22.3431 24 24 24H30C31.6569 24 33 22.6569 33 21V15C33 13.3431 31.6569 12 30 12Z"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M13.425 19.5L12 16.5V15.75C12 14.5074 12.9074 13.5 14.25 13.5H16.5V15H14.25C13.8358 15 13.5 15.3358 13.5 15.75V16.5L15.075 19.5H13.425Z"
            fill="currentColor"
          />
          <path
            d="M28.425 19.5L27 16.5V15.75C27 14.5074 27.9074 13.5 29.25 13.5H31.5V15H29.25C28.8358 15 28.5 15.3358 28.5 15.75V16.5L30.075 19.5H28.425Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <p className="text-slate-700 dark:text-slate-300 mb-6 flex-grow">
        {testimonial.quote}
      </p>

      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={testimonial.imageUrl}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
