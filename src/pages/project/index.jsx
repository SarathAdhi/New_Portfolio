import React, { useEffect, useState } from "react";
import { PageLayout } from "../../common/layout/PageLayout";
import { client } from "../../client";
import AnimatedCard from "../../common/components/AnimatedCard";
import { motion } from "framer-motion";
import { H2 } from "../../common/components/elements/Text";
import { BsFillGridFill } from "react-icons/bs";
import { LinkTag } from "../../common/components/elements/LinkTag";
import { PageWrapper } from "../../common/layout/PageWrapper";

const tabs = [
  { icon: <BsFillGridFill className="w-4 md:w-6 text-white" />, label: "All" },
  {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    label: "ReactJS",
  },
  {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg",
    label: "NextJS",
  },
  {
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    label: "NodeJS",
  },
];

export default function Projects({ projects }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (selectedTab.label === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => {
        if (
          project.techstack
            .map((tech) => {
              if (tech.fname === selectedTab.label) return true;
              return "";
            })
            .includes(true)
        ) {
          return project;
        } else return "";
      });

      setFilteredProjects(filtered);
    }
  }, [selectedTab]);

  if (!projects) return <PageWrapper></PageWrapper>;

  return (
    <PageLayout title="Projects" className="bg-[#5c4aff]">
      <AnimatedCard
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        className="flex justify-center flex-wrap mt-5 gap-5"
      >
        {filteredProjects.map((project, index) => {
          return (
            <motion.div
              key={project.name + index}
              className="group w-full md:w-[400px] rounded-lg cursor-pointer flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LinkTag href={"project/" + project.name}>
                <div className="z-30 shadow-lg shadow-indigo-900 bg-white/40 flex gap-y-5 flex-col justify-between w-full h-full p-5 rounded-lg duration-300">
                  <H2 className="font-semibold duration-300">{project.name}</H2>
                  <p>{project.about.substring(0, 40) + "..."}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.techstack.map(({ fname }) => (
                      <motion.p
                        key={fname}
                        whileHover={{ scale: 1.02 }}
                        className="bg-[#03506F] px-2 py-1 text-white rounded-md"
                      >
                        {fname}
                      </motion.p>
                    ))}
                  </div>
                  <p className="text-right font-semibold flex flex-col items-end justify-center relative">
                    <span>View more</span>
                    <span className="absolute duration-300 bottom-0 w-0 group-hover:w-[74px] border-none h-[2px] rounded-xl bg-indigo-900" />
                  </p>
                </div>
              </LinkTag>
            </motion.div>
          );
        })}
      </AnimatedCard>
    </PageLayout>
  );
}

export async function getServerSideProps() {
  const projectsQuery = '*[_type == "projects"]';
  const response = await client.fetch(projectsQuery);

  return {
    props: {
      projects: response,
    },
  };
}
