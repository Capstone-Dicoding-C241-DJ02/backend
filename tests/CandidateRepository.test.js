import CandidateRepository from "../src/repositories/CandidateRepository";
import prismaClient from "../src/apps/prismaClient";
import { describe, expect, it } from "@jest/globals";

const repository = new CandidateRepository(prismaClient);

describe("Candidate Repository", () => {
  it("test", async () => {
    console.log(await repository.getFromLeaderboard(1));
  });
  it("should get all candidates in a leaderboard", async () => {
    const { candidates } = await repository.getFromLeaderboard(1);

    expect(candidates).not.toBeNull();
    expect(candidates).toBeInstanceOf(Array);
  });

  it.failing("should error when leaderboard doesn't exist", async () => {
    await repository.getFromLeaderboard(10);
  });

  it.failing("should fail when id is not a number", async () => {
    await repository.getFromLeaderboard("dqdw");
  });

  it("Should get candidate detail within the leaderboard", async () => {
    const schema = {
      id: 5,
      fullname: "Applicant1",
      title: "Cloud Engineer",
      email: "test@gmail.com",
      phone: "0320832",
      additional_link: "https://qsw.com",
      passphoto: "applicant_passphoto.png",
      cv_name: "cv.pdf",
      cv_summary: "lorem ipsum",
      match_percentage: 92,
      leaderboardId: 1,
    };

    expect(await repository.getDetails(5)).toEqual(schema);
  });

  it.failing("should fail when candidate not exist", async () => {
    await repository.getDetails(100);
  });

  it("should add new to leaderboard", async () => {
    const candidate = {
      fullname: "new applicant",
      email: "new@gmail.com",
      cv_name: "cv.pdf",
      cv_summary: "lorem ipsum",
      phone: "0320832",
      match_percentage: 70,
      title: "Cloud Engineer",
      additional_link: "https://qsw.com",
      passphoto: "applicant_passphoto.png",
    };

    const newCandidate = await repository.addToLeaderboard(1, candidate);
    expect(newCandidate).not.toBeNull();

    await prismaClient.candidate.delete({ where: { id: newCandidate.id } });
  });
});
