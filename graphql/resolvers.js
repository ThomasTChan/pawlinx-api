const contributors = [
  {
    name: 'Austen',
    location: 'San Francisco',
  },
  {
    name: 'Philipp Muens',
    location: 'San Francisco',
  },
  {
    name: 'Nik Graf',
    location: 'San Francisco',
  },
  {
    name: 'Siddharth Gupta',
    location: 'San Francisco',
  },
];

module.exports.resolvers = {
  Query: {
    getContributorFeed: () => contributors,
  },
};
