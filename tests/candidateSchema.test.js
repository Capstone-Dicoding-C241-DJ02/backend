import APIError from "../src/utils/APIError";
import candidateSchema from "../src/validations/candidateSchema";
import validate from "../src/validations/validate";
import { describe, expect, it } from "@jest/globals";

describe("Candidate Schema Validation", () => {
  const data = {
    fullname: "Sugito",
    title: "Engineer",
    email: "test@mail.com",
    phone: "083112322131",
    additional_link: "http://wqqqq.com",
  };

  it("should return the validated result", () => {
    expect(validate(candidateSchema, data)).toEqual(data);
  });

  it("should throw 'Nama lengkap harus diisi' message", () => {
    data.fullname = "";
    expect(() => validate(candidateSchema, data)).toThrow(APIError);
    expect(() => validate(candidateSchema, data)).toThrow(
      "Nama lengkap harus diisi"
    );
  });

  it("should throw 'Nomor handphone harus diisi' message", () => {
    data.fullname = "wdqd";
    data.phone = "";
    expect(() => validate(candidateSchema, data)).toThrow(APIError);
    expect(() => validate(candidateSchema, data)).toThrow(
      "Nomor handphone harus diisi"
    );
  });

  it("should throw 'Nomor handphone tidak valid' message", () => {
    data.phone = "01990131";
    expect(() => validate(candidateSchema, data)).toThrow(APIError);
    expect(() => validate(candidateSchema, data)).toThrow(
      "Nomor handphone tidak valid"
    );
  });

  it("should throw 'Title anda harus diisi' message", () => {
    data.phone = "083112322131";
    data.title = "";
    expect(() => validate(candidateSchema, data)).toThrow(APIError);
    expect(() => validate(candidateSchema, data)).toThrow(
      "Title anda harus diisi"
    );
  });

  it("should throw 'Link tidak valid' message", () => {
    data.title = "Engineer";
    data.additional_link = "wqdqd";
    expect(() => validate(candidateSchema, data)).toThrow(APIError);
    expect(() => validate(candidateSchema, data)).toThrow("Link tidak valid");
  });
});
