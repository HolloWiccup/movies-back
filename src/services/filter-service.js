const filterSortService = (sort, Model) => {
	const query = Model.find();

	if (sort) {
		query.sort({ [sort.field]: sort.direction });
	}
	return query.exec();
};

export { filterSortService };
