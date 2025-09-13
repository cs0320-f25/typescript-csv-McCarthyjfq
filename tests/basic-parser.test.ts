import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("Empty file", async () => {
  const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv");
  const results = await parseCSV(EMPTY_CSV_PATH);
  expect(results).toEqual([]);
});

test("Header restriction", async () => {
  const HEAD_CSV_PATH = path.join(__dirname, "../data/head.csv");
  const results = await parseCSV(HEAD_CSV_PATH);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Felix", "22"]);
});

test("Whitespace", async () => {
  const WHITESPACE_CSV_PATH = path.join(__dirname, "../data/whitespace.csv");
  const results = await parseCSV(WHITESPACE_CSV_PATH);
  expect(results[1]).toEqual(["Felix", "22"]);
});

test("Name should be string and age should be int", async () => {
 const results = await parseCSV<string[]>(PEOPLE_CSV_PATH);
  expect(typeof results[2][0]).toBe("string");
  const age = results[2][1];
  const parsed = Number.parseInt(age, 10);
  expect(Number.isNaN(parsed)).toBe(false);
});

test("Comma in between", async () => {
  const TEST1_CSV_PATH = path.join(__dirname, "../data/test1.csv");
  const results = await parseCSV(TEST1_CSV_PATH);
  expect(results[5]).toEqual(["Felix, Chiao", "22"]);
});
