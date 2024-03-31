import axios from "axios";
import baseAxios from "./domainSettings";
import { IssueDetails, IssueSummary, NewIssue } from "@/models/Issue";

const issueUrl = "/issue";

export const createNewIssue = async (issue: NewIssue): Promise<boolean> => {
  try {
    const response = await baseAxios.post(issueUrl, issue);
    return response.data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getIssueList = async (
  projectId: string,
  issueStatus: string,
  page: number,
): Promise<IssueSummary[]> => {
  const ISSUE_PER_PAGE = 15;

  try {
    const response = await baseAxios.post(`${issueUrl}/allTickets/${issueStatus}`, {
      projectId,
      ISSUE_PER_PAGE,
      page
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getIssueDetails = async (
  issueId: string
): Promise<IssueDetails> => {
  try {
    const response = await baseAxios.get(`${issueUrl}/${issueId}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const searchIssue = async (
  status: string,
  filter: string,
  word: string
): Promise<IssueSummary[]> => {
  try {
    const response = await baseAxios.get(
      `${issueUrl}/search/${status}?filter=${filter}&word=${word}`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
