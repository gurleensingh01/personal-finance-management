import Link from 'next/link';

export default function Page() {

  return (
      <div className="flex h-screen bg-black font-serif">

        <div className="m-auto text-center">
          <p className="text-white text-5xl mb-8">Personal Finance Management</p>
          <p className='text-3xl'>Begin your finance <Link className="hover:underline hover:cursor-pointer" href="/personal-finance-management">now</Link>
          </p>
        </div>
        
      </div>
    );
}