import HomeBar from "@/components/homebar";

export const metadata = {
  title: "Movies Zone | Home",
  description: "Created By GoodnessDev",
  tags: ["nextjs", "#movieszone", "moviestrailer", "tmdbapi"],
};

const HomeLayout = ({ children }) => {
  return (
    <div className="lg:m-20 md:m-15 m-5">
      <HomeBar />
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
