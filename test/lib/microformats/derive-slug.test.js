const test = require('ava');

// Function
const derviveSlug = require(process.env.PWD + '/app/lib/microformats/derive-slug.js');

// Fixtures
const provided = require('./fixtures/slug-provided');
const providedEmpty = require('./fixtures/slug-provided-empty');
const missing = require('./fixtures/slug-missing');
const missingNoName = require('./fixtures/slug-missing-no-name');

// Tests
test('Derives slug from `mp-slug` property', t => {
  const slug = derviveSlug(provided, '-');
  t.is(slug[0], 'made-a-thing');
});

test('Derives slug, ignoring empty `mp-slug` property', t => {
  const slug = derviveSlug(providedEmpty, '-');
  t.is(slug[0], 'made-a-thing-with-javascript');
});

test('Derives slug from `name` property', t => {
  const slug = derviveSlug(missing, '-');
  t.is(slug[0], 'made-a-thing-with-javascript');
});

test('Derives slug by generating random number', t => {
  const slug = derviveSlug(missingNoName, '-');
  t.regex(slug[0], /[\d\w]{5}/g);
});
