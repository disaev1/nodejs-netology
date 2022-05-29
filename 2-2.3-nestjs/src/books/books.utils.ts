const notFoundMessage = (id: string): string => `There is no book with id = ${id}!`;
const deletedMessage = (id: string): string => `Book with id = ${id} is sucessfully deleted.`;

export { notFoundMessage, deletedMessage };
