import {getFirstString} from "../../../util/helpers.js";

export async function interaction(db, interaction) {
    const { channelId } = interaction;

    let doc = await db.subsCollection.findOne({ channelId: channelId });
    if (!doc || doc.checked != true) {
        return ' 🛑 Before you remove a subscription group, please run `/zkillbot check`` to ensure all permissions are set properly for this channel';
    }
    // TODO: Potentially cache known names of subgroups for channels
    let valueRaw = getFirstString(interaction, ["group_name"]);
    if (doc.subgroups && !Object.keys(doc.subgroups).includes(valueRaw)) {
        return `🛑 Subscription group **${valueRaw}** does not exists`;
    }
    await db.subsCollection.updateOne({ channelId: channelId }, { $unset: { [`subgroups.${valueRaw}`]: {} } });
    return `✅ Successfully removed subscription group **${valueRaw}**`
}
