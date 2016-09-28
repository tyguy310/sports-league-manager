exports.seed = function (knex, Promise) {
  return knex('locations')
  .then(function() {
    return Promise.all([
      knex('locations').insert({
        location_name: 'Wash Park Soccer Field',
        location_image: 'http://gac.sndimg.com/content/dam/images/gac/fullset/2013/2/19/0/02-gh2011-denver-hotspots-skyline-washington-park-2011.jpg.rend.hgtvcom.1280.960.jpeg',
        location_description: 'Large open space in Washington Park. Potential for several sports, with nearby tennis and basketball courts as well.',
        loc_add_line_1: '1000 South Downing Street',
        loc_add_city: 'Denver',
        loc_add_state: 'Colorado',
        loc_add_zip: '80209'
      }),
      knex('locations').insert({
        location_name: 'Cheesman Park',
        location_image: 'http://www.mundusbishop.com/uploads/4/5/2/1/45216155/5659030_orig.jpg',
        location_description: 'Nicely-groomed grassy field with soccer goals and spacious bathrooms. Watch out for the squirrels!',
        loc_add_line_1: '1049 North High Street',
        loc_add_city: 'Denver',
        loc_add_state: 'Colorado',
        loc_add_zip: '80206'
      }),
      knex('locations').insert({
        location_name: 'Denver East High School',
        location_image: 'http://chsaanow.com/wp-content/uploads/2013/07/20130730_CHSAA_DENVER_EAST_127.jpg',
        location_description: 'Open to the public on weekdays after 5 o\'clock unless the school\'s teams are playing. Two baseball/softball fields, a football field, and smaller areas for cornhole or whatever. No alcohol allowed here; it is a school.',
        loc_add_line_1: '1600 City Park Esplanade',
        loc_add_city: 'Denver',
        loc_add_state: 'Colorado',
        loc_add_zip: '80206'
      }),
      knex('locations').insert({
        location_name: 'Columbine High School Field',
        location_image: 'http://vignette4.wikia.nocookie.net/columbine/images/e/e4/Columbine_high_school_on_day_of_attack.jpg/revision/latest?cb=20101111213727',
        location_description: 'Forget about the kids who died here and come play some badminton! Public fields available on evenings and weekends, as well as all summer.',
        loc_add_line_1: '6201 S Pierce St.',
        loc_add_city: 'Littleton',
        loc_add_state: 'Colorado',
        loc_add_zip: '80123'
      }),
      knex('locations').insert({
        location_name: 'Sloan\'s Lake North Field',
        location_image: 'http://www.marcushometeam.com/briefcase/96095_412015112843AM78524.jpg',
        location_description: 'From Sheridan, turn east on 25th Street; the field is a quarter mile ahead on the right. Great views, but the area often smells like goose poop.',
        loc_add_line_1: '1700 North Sheridan Blvd',
        loc_add_city: 'Denver',
        loc_add_state: 'Colorado',
        loc_add_zip: '80212'
      })
    ]);
  });
};
