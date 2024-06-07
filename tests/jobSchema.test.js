import { describe, expect, it } from "@jest/globals";
import validate from "../src/validations/validate";
import jobSchema from "../src/validations/jobSchema";
import APIError from "../src/utils/APIError";

describe("Job Schema Validation", () => {
  const data = {
    title: "Engineer",
    city: "Jakarta",
    desc: "Hello World",
    business_sector: "Finance",
  };

  it("Should return the validated data", () => {
    expect(validate(jobSchema, data)).toEqual(data);
  });

  it("should throw 'Judul lowongan harus diisi'", () => {
    const newData = { ...data, title: "" };

    expect(() => validate(jobSchema, newData)).toThrow(APIError);
    expect(() => validate(jobSchema, newData)).toThrow(
      "Judul lowongan harus diisi"
    );
  });

  it("should throw 'Lokasi harus diisi' message", () => {
    const newData = { ...data, city: "" };

    expect(() => validate(jobSchema, newData)).toThrow(APIError);
    expect(() => validate(jobSchema, newData)).toThrow("Lokasi harus diisi");
  });

  it("should throw 'Sektor bisnis harus diisi' message", () => {
    const newData = { ...data, business_sector: "" };

    expect(() => validate(jobSchema, newData)).toThrow(APIError);
    expect(() => validate(jobSchema, newData)).toThrow(
      "Sektor bisnis harus diisi"
    );
  });

  it("should throw 'Deskripsi pekerjaan harus diisi' message", () => {
    const newData = { ...data, desc: "" };

    expect(() => validate(jobSchema, newData)).toThrow(APIError);
    expect(() => validate(jobSchema, newData)).toThrow(
      "Deskripsi pekerjaan harus diisi"
    );
  });
});
