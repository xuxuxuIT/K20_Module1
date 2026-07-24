// bai 1
const members = [
  { id: 1, name: "Minh Tran", email: "minh@example.com" },
  { id: 2, name: "Lan Pham", email: "lan@example.com" },
  { id: 3, name: "Huy Nguyen", email: "huy@example.com" },
  { id: 4, name: "Trang Le", email: "trang@example.com" },
  { id: 5, name: "Duc Vo", email: "duc@example.com" },
];

const books = [
  { id: 201, title: "Clean Code", finePerDay: 5000 },
  { id: 202, title: "Atomic Habits", finePerDay: 3000 },
  { id: 203, title: "Sapiens", finePerDay: 4000 },
  { id: 204, title: "Deep Work", finePerDay: 2000 },
  { id: 205, title: "The Pragmatic Programmer", finePerDay: 6000 },
];

const borrowRecords = [
  {
    id: 3001,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 2 },
      { bookId: 202, lateDays: 0 },
    ],
  },
  {
    id: 3002,
    memberId: 2,
    lines: [
      { bookId: 202, lateDays: 1 },
      { bookId: 203, lateDays: 3 },
    ],
  },
  {
    id: 3003,
    memberId: 3,
    lines: [
      { bookId: 204, lateDays: 5 },
      { bookId: 205, lateDays: 2 },
    ],
  },
  {
    id: 3004,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 203, lateDays: 2 },
    ],
  },
  {
    id: 3005,
    memberId: 5,
    lines: [{ bookId: 205, lateDays: 10 }],
  },
  {
    id: 3006,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 205, lateDays: 3 },
    ],
  },
  {
    id: 3007,
    memberId: 2,
    lines: [
      { bookId: 204, lateDays: 2 },
      { bookId: 203, lateDays: 1 },
    ],
  },
  {
    id: 3008,
    memberId: 3,
    lines: [{ bookId: 202, lateDays: 2 }],
  },
  {
    id: 3009,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 202, lateDays: 1 },
    ],
  },
  {
    id: 3010,
    memberId: 5,
    lines: [
      { bookId: 203, lateDays: 4 },
      { bookId: 204, lateDays: 3 },
    ],
  },
];

function getMemberFineStatistics(members, books, borrowRecords) {
  const result = members.map((member) => {
    return {
      id: member.id,
      name: member.name,
      totalFine: 0,
      books: [],
    };
  });

  for (const member of result) {
    for (const record of borrowRecords) {
      if (record.memberId !== member.id) {
        continue;
      }

      if (!Object.hasOwn(record, "lines")) {
        continue;
      }

      for (const line of record.lines) {
        const book = books.find((item) => {
          return item.id === line.bookId;
        });

        if (!book) {
          continue;
        }

        const fine = line.lateDays * book.finePerDay;

        const existedBook = member.books.find((item) => {
          return item.title === book.title;
        });

        if (!existedBook) {
          member.books.push({
            title: book.title,
            lateDays: line.lateDays,
            fine: fine,
          });
        } else {
          existedBook.lateDays += line.lateDays;
          existedBook.fine += fine;
        }
      }
    }

    // Tính tổng tiền phạt của member
    member.totalFine = member.books.reduce((sum, book) => {
      return sum + book.fine;
    }, 0);

    // Sắp xếp sách theo fine giảm dần
    member.books.sort((a, b) => {
      return b.fine - a.fine;
    });
  }

  // Sắp xếp member theo totalFine giảm dần
  result.sort((a, b) => {
    return b.totalFine - a.totalFine;
  });

  // Khóa từng member
  for (const member of result) {
    Object.freeze(member);
  }

  // Khóa mảng kết quả
  Object.freeze(result);

  return result;
}

class MemberPaginator {
  constructor(resultList, pageSize) {
    this.resultList = resultList;
    this.pageSize = pageSize;
  }

  [Symbol.iterator]() {
    let index = 0;
    const list = this.resultList;
    const size = this.pageSize;

    return {
      next() {
        if (index >= list.length) {
          return {
            done: true,
          };
        }

        const page = list.slice(index, index + size);

        index += size;

        return {
          value: page,
          done: false,
        };
      },
    };
  }
}
const result = getMemberFineStatistics(members, books, borrowRecords);

console.log(result);
