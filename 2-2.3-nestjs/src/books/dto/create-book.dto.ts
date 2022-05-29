export class CreateBookDto {
  title?: string;
  description?: string;
  authors?: string[] | string;
  favourite?: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}
