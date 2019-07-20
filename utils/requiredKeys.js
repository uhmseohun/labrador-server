export default {
  createDevice: ['type', 'name', 'owners', 'desc', 'methods'],
  authorizeUser: ['id', 'password'],
  createUser: ['id', 'password', 'name'],
  createPlace: ['type', 'name', 'desc', 'geocode'],
  editPlace: ['type', 'name', 'desc', 'geocode', 'registrar']
}
