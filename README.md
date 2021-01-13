My version of the reddit website, created as part of the curriculum of The Odin Project

updates to add:

need to only allow updates on comments for those whose comment it is. (some new update settings in post). maybe:
https://firebase.google.com/docs/firestore/security/rules-fields#allowing_only_certain_fields_to_be_changed

allow update: if (request.resource.data.diff(resource.data).affectedKeys()
.hasOnly(['name', 'location', 'city', 'address', 'hours', 'cuisine']));
}

maybe need to do some deep checking.
