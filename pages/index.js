import prisma from "lib/prisma";
import { getJobs } from "lib/data";
import Jobs from "components/Jobs";

export async function getServerSideProps(context) {
  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      jobs,
    },
  };
}

export default function Home({ jobs }) {
  // console.log("jobs", jobs);
  return (
    <div className="mt-10">
      <div className="text-center p-4 m-4">
        <h2 className="mb-10 text-4l font-bold">Find a job!</h2>
      </div>
      <Jobs jobs={jobs} />
    </div>
  );
}
