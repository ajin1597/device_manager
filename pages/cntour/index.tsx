import { parseString } from "xml2js";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";

// interface Item {
//   mng_no: string;
//   local_nm: string;
//   type: string;
//   nm: string;
//   nm_sub: string;
//   addr: string;
//   lat: string;
//   lng: string;
//   tel: string;
//   h_url: string;
//   desc: string;
// }

// interface Item_info {
//   item: Item[];
// }

// interface Result {
//   item_info: Item_info;
// }

// interface CntourListRespons {
//   name: string;
//   result?: Result;
// }

export interface CntourListRespons {
  name: string;
  result: Result;
}

export interface Result {
  item_info: ItemInfo;
}

export interface ItemInfo {
  item: Item[];
}

export interface Item {
  mng_no: string;
  local_nm: string;
  type: string;
  nm: string;
  nm_sub: string;
  addr: string;
  lat: string;
  lng: string;
  tel: string;
  h_url: string;
  desc: string;
  list_img: string;
}

const Home: NextPage = () => {
  const [totalCnt, setTotalCnt] = useState(0);
  const [tours, setTours] = useState<Item[] | undefined>([]);
  const [pageNum, setPageNum] = useState(1);

  function 관광명소가져오기() {
    fetch(`/api/tour/cntourlist?start=${pageNum}&end=${pageNum + 4}`)
      .then((res) => res.json())
      .then((json: CntourListRespons) => {
        const 기존배열 = tours || [];
        const 신규배열 = json.result?.item_info.item || [];

        setTours([...기존배열, ...신규배열]);
        setPageNum(pageNum + 5);
      });
  }

  useEffect(() => {
    fetch("/api/tour/cntour")
      .then((res) => res.json())
      .then((json) => setTotalCnt(json.totalCnt));
  }, []);

  useEffect(() => {
    관광명소가져오기();
  }, []);

  return (
    <Layout title="충남 관광명소">
      <div>충남 관광명소 페이지</div>
      <div className="text-3xl">{totalCnt}개의 박종훈 주니어</div>
      <div>
        {tours &&
          tours.map((tour, idx) => (
            <Link href={`/cntour/${tour.mng_no}`}>
              <button>
                <div key={idx}>
                  <div>{tour.mng_no}</div>
                  <div>지역 : {tour.local_nm}</div>
                  <div>{tour.type}</div>
                  <div>{tour.nm}</div>
                  <div>{tour.nm_sub}</div>
                  <div>{tour.addr}</div>
                  <div>{tour.lat}</div>
                  <div>{tour.lng}</div>
                  <div>{tour.tel}</div>
                  <div>{tour.h_url}</div>
                  {/* <div>{tour.desc}</div> */}
                  <hr />
                  <hr />
                </div>
              </button>
            </Link>
          ))}
      </div>

      <button
        className="w-full bg-red-200 rounded-xl h-10 hover:bg-blue-300"
        onClick={관광명소가져오기}
      >
        더보기 ({tours?.length}/ {totalCnt})
      </button>
    </Layout>
  );
};

export default Home;
