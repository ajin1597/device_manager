import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const Home: NextPage = () => {
  const [mng_no, setMng_no] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMng_no(router.query.mng_no?.toString() || "");
  }, [router.query]);

  return (
    <Layout title={"에러"}>
      <h1 className="w-full h-full flex flex-cor justify-center items-center">
        asd
      </h1>
    </Layout>
  );
};
export default Home;
