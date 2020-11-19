/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin', 'staff', 'user'],
	user: ['admin', 'staff', 'user'],
	staff: ['admin', 'staff'],
	onlyGuest: []
};

export default authRoles;
