import { test, expect } from "@jest/globals";
import axios from "axios";

const jobDesc =
  "Job DescriptionDesign, develop and build highly scalable, cross-platform, and performant web and mobile applications using React and React-Native.Perform issue analysis, root-cause analysis, and issue resolutionCreate any required technical documentationRequirementsStrong proficiency with Javascript and/ or TypescriptOutstanding skills in React and React NativeStrong understanding of user-friendly experience interface, paying attention to details, and proficient in HTML5, SASS/ SCSS, React Native Styling, and animation.Extensive knowledge of using RESTful and/ or GraphQLExtensive knowledge in unit testing.Experience working with Redux and Redux SAGAExperience in using GitPreferredExperience in responsive web design and PWAExperience in Native Modules development with Java/ Kotlin or Swift.Experience in using Gulp, Grunt, or Webpack is a plus.Extensive knowledge of other programming languages like Java/ Kotlin, Swift, and C#.Experience In system development using machine learning is a plus.Experience in system development relevant to IoT.Experience in AR/ VR development.Experience in a formal development methodology - Agile/ SCRUM, Iterate, Waterfall.Experience with Continuous Integration and Continuous Delivery (CI/ CD) such as AppCenter, AWS CodeBuild/ CodeDeploy/ CodePipeline/ CodeCommit.Familiarity with Visual Studio Code as IDE.";

const URL =
  "https://asia-southeast2-submissionmlgc-alansugito.cloudfunctions.net/cv_scoring-1";

const getMatchingResult = async () => {
  const { data } = await axios.post(URL, {
    cv_name: "1717563170823_CV-ATS.pdf",
    jobdesc_text: jobDesc,
  });

  return data;
};

test("response should have result field", async () => {
  expect(await getMatchingResult()).toHaveProperty("result");
});

test("result should be a floating number", async () => {
  const data = await getMatchingResult();
  expect(typeof data.result).toBe("number");
});
