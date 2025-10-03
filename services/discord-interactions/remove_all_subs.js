
export const requiresManageChannelPermission = true;

export async function interaction(db, interaction) {
	const { guildId, channelId } = interaction;

	await db.subsCollection.deleteOne(
		{ guildId, channelId }
	);

	return '❌ All subscriptions removed from this channel.  To subscribe again please run /zkillbot check`';
}