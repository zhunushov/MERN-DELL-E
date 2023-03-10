import React, { useState, useEffect } from "react";

import { Card, FormField, Loader } from "../components";
import { API } from "../constants";

const RenderCards = ({ data, title }) => {
  if (data?.length) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedPosts, setSearchedPosts] = useState(null);
  const [searchTimeoutId, setSearchTimeoutId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(API + "post");
        if (response.ok) {
          const results = await response.json();
          setAllPosts(results.data.reverse());
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeoutId);
    setSearchText(e.target.value);

    setSearchTimeoutId(
      setTimeout(() => {
        const searchedData = allPosts.filter((post) => {
          const include = (key) => {
            return post[key].toLowerCase().includes(searchText.toLowerCase());
          };
          if (include("name") || include("prompt")) {
            return post;
          }
        });
        setSearchedPosts(searchedData);
      }, 500)
    );
  };
  return (
    <section className="max-w7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222323] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DELL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          type={"text"}
          name="text"
          value={searchText}
          labelName="Search posts"
          placeholder={"Search posts"}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#66e75] text-xl mb-3">
                Showing results for
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedPosts}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
