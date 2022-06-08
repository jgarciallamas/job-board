import prisma from "lib/prisma";
import { getCompany, getCompanyJobs } from "lib/data";
import Job from "components/Job";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const { id } = params;

  let company = await getCompany(id, prisma);
  let jobs = await getCompanyJobs(id, prisma);

  company = JSON.parse(JSON.stringify(company));
  jobs = JSON.parse(JSON.stringify(jobs));

  console.log("company, jobs", company, jobs);
  return {
    props: {
      jobs,
      company,
    },
  };
}

export default function Company({ jobs, company }) {
  return (
    <div className="mt-10">
      <div className="text-center p-4 m-4">
        <Link href={`/`}>
          <a href="" className="mb-10 text-sm font-bold underline">
            back
          </a>
        </Link>
      </div>
      <div className="text-center p-4 m-4">
        <h2 className="mb-10 text-4xl font-bold">Profile of {company.name}</h2>
      </div>

      <div className="mb-4 mt-20">
        <div className="pl-16 pr-16 -mt-6">
          <p className="text-center text-xl font-bold">Company jobs</p>
          {jobs.map((job, index) => (
            <Job key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
