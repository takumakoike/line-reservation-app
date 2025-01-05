import Link from 'next/link';

export default function Home() {
  
  return (
    <div>
      <h1>LINE de Reserve</h1>
      <div className="links">
        <Link href="/api">
          APIテスト
        </Link>

        <form action="/api" method='POST'>
          <div>
            <label htmlFor="name">なまえ</label>
            <input type="text" id="name" name='name' />
          </div>
          <button type="submit">そうしん</button>
        </form>

      </div>
    </div>
  );
}
