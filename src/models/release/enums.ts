export enum ReleaseCategory {
  Unknown = 0,
  Series = 1,
  Movie = 2,
  OVA = 3,
  Special = 6,
}

export enum VoteType {
  Like = 2,
  Dislike = 1,
}

export enum ReleaseStatus {
  Unknown = 0,
  Finished = 1,
  Airing = 2,
  Announced = 3,
}

export enum FilterGenresMode {
  All = 0,
  Any = 1,
  Exclude = 2,
}

export enum FilterAgeRating {
  LessThan13 = 1,
  MoreThan13 = 2,
  MoreThan26 = 3,
  MoreThan100 = 4,
}

export enum FilterSort {
  DateUpdateDesc = 0,
  GradeDesc = 1,
  YearDesc = 2,
  PopularDesc = 3,
  DateUpdateAsc = 4,
  GradeAsc = 5,
  YearAsc = 6,
  PopularAsc = 7,
}

export enum ReleaseVideoResult {
  InvalidReleaseId = 2,
}

export enum BookmarkExportResult {
  InvalidProfileLists = 2,
  InvalidExtraFields = 3,
}

export enum ReleaseVideoAppealResult {
  InvalidReleaseId = 2,
  InvalidTitle = 3,
  InvalidCategory = 4,
  InvalidUrl = 5,
  AppealAlreadySent = 6,
  TooManyAppeals = 7,
  AppealNotOwned = 8,
  AppealNotFound = 9,
  AppealDisabled = 10,
}
