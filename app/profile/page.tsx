import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="w-full flex flex-col gap-12 mt-7">
      <section className="w-full flex justify-around items-center">
        <div className="size-35 rounded-full overflow-hidden">
          <Image
            src="/profile.png"
            alt="Greta Bennett"
            width={140}
            height={140}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold font-montagu text-center leading-tight">
            Greta
            <br />
            Bennett
          </h1>

          <div className="flex justify-center items-center rounded-full px-3 py-1.5 h-8 bg-linear-to-b from-[#FFFADC]/50 to-[#FFF197]/50 shadow-[0px_11.3915px_22.3363px_rgba(255,227,42,0.19),inset_0px_-2px_1px_rgba(255,241,151,0.4)] backdrop-blur-[2px]">
            {[1, 2, 3].map((i) => (
              <svg
                key={`full-${i}`}
                className="w-5 h-5 text-[#FFF197] drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L4.053 9.384c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 00.951-.69l1.286-3.957z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            ))}

            {[1, 2].map((i) => (
              <svg
                key={`empty-${i}`}
                className="w-5 h-5 text-[#FFF197]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L4.053 9.384c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 00.951-.69l1.286-3.957z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full mb-4 border border-[#383838]"></div>
        <p className="w-full flex">
          <span className="block font-bold">Bio:</span> 🌿 Plant lover | Yard Designer
          | Creator
          <br />I like to connect with people and give a lot of help!
        </p>
        <div className="w-full mt-4 border border-[#383838]"></div>
      </section>

      <div className="w-full flex flex-col justify-center items-center gap-6">
        <section className="w-full border border-[#E7CC65] rounded-xl flex items-center py-5 shadow-sm bg-[#121212]/50">
          <div className="flex-1 flex flex-col items-center justify-center gap-1">
            <h3 className="text-[15px] font-bold">Helped</h3>
            <p className="text-[#E7CC65] text-3xl font-bold">23</p>
          </div>
          {/* Linia despărțitoare verticală */}
          <div className="w-px h-12 bg-white/30"></div>
          <div className="flex-1 flex flex-col items-center justify-center gap-1">
            <h3 className="text-[15px] font-bold">Posts</h3>
            <p className="text-[#E7CC65] text-3xl font-bold">3</p>
          </div>
        </section>
        {/* 4. Best At Card */}
        <section className="w-full border border-[#E7CC65] rounded-xl px-5 py-4 flex justify-between items-center bg-[#121212]/50">
          <div className="flex flex-col gap-1">
            <h2 className="text-[#E7CC65] font-bold text-xl font-serif">
              Best at
            </h2>
            <p className="text-[17px]">Gardening</p>
          </div>
          {/* Iconița de plantă (SVG custom ca să semene cu designul) */}
          <div className="text-white w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M12 22C12 22 12 16 12 14C12 14 10 14 8 12C6 10 6 6 6 6C6 6 8 8 10 8C12 8 12 14 12 14C12 14 14 14 16 12C18 10 18 6 18 6C18 6 16 8 14 8C12 8 12 14 12 14C12 16 12 22 12 22ZM9 22H15V20H9V22Z" />
            </svg>
          </div>
        </section>
        {/* 5. Skills Card */}
        <section className="w-full border border-[#E7CC65] rounded-xl px-5 py-4 flex flex-col gap-3 bg-[#121212]/50">
          <h2 className="text-[#E7CC65] font-bold text-xl font-serif">Skills</h2>
          <div className="flex items-center gap-6 text-[15px]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E7CC65]"></span>
              Gardening
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E7CC65]"></span>
              Cooking
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E7CC65]"></span>
              DIY
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
