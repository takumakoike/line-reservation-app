import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>LINE de Reserve</h1>
      <div className="links">
        <Link href="/api">
          APIテスト
        </Link>


      </div>
    </div>
  );
}
