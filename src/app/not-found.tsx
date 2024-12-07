import Link from 'next/link';
import NotFoundCode from '@/src/components/icons/NotFoundCode';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100svh-200px)] w-full items-center justify-center">
      <div className="flex h-fit flex-col items-center justify-center text-center">
        <div className="[&_svg]:w-60 lg:[&_svg]:w-80">
          <NotFoundCode />
        </div>

        <h2 className="title py-4 uppercase">გვერდი არ მოიძებნა 404</h2>

        <Link href="/" className="smtext text-secondary underline">
          მთავარზე დაბრუნება
        </Link>
      </div>
    </div>
  );
}
