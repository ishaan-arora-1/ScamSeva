export default function Card() {
    return (
      <div className="w-[1000px] h-[254px] rounded-[20px] p-[5px] shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] bg-gradient-to-br from-[#AF40FF] to-[#5B42F3] via-[#00DDEB]">
        <div className="bg-[#05062D] rounded-[17px] w-full h-full flex justify-evenly">
          <div className="pl-8 w-[250px] text-white font-bold text-2xl flex items-center">
            Verify Your Warrant
          </div>
          <div className="w-[180px] mt-7 ">
            <img src="doc.png" alt="" />
          </div>
          <div className="pr-8 w-[250px] text-white font-bold text-2xl flex items-center justify-end">
            <div className="w-[140px]">You will find differences</div>
          </div>
        </div>
      </div>
    );
  }