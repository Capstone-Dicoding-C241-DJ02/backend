import { describe, expect, it } from "@jest/globals";
import StorageUtil from "../src/utils/StorageUtil";

describe("Storage Utility Class", () => {
  const bucketName = "api-test-bucket-02739";
  it("Should upload a file into a bucket", async () => {
    expect(
      await StorageUtil.uploadToBucket(
        bucketName,
        "/home/sugito/project/backend/tests/testfile.txt"
      )
    ).toBeTruthy();
  });

  it.failing(
    "should error throw an APIError when the path is not valid or file not exist",
    async () => {
      await StorageUtil.uploadToBucket(bucketName, "/ss");
    }
  );

  it("should get file signedUrl", async () => {
    expect(await StorageUtil.getSignedUrl(bucketName, "testfile.txt")).toMatch(
      /https/
    );
  });

  it.failing(
    "should throw an APIError when the file is not exist",
    async () => {
      await StorageUtil.getSignedUrl(bucketName, "nofilenamedthis.txt");
    }
  );
});
