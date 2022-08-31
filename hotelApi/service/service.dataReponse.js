export default (records, page = 1, count = 1, limit = 1) => {
    // console.log("pageeeee", page, count, limit);
    let last = Math.ceil(count / limit);
    return {
        records,
        nbRecords: count,
        page: {
            current: page,
            previous: (page > 1) ? page - 1 : null,
            next: (page < last) ? page + 1 : null,
            last: last
        }
    };
}
