import { BotWithCache, ChannelTypes } from "../../deps.ts";
import { requireBotGuildPermissions } from "../permissions.ts";

export function deleteChannel(bot: BotWithCache) {
  const deleteChannel = bot.helpers.deleteChannel;

  bot.helpers.deleteChannel = async function (channelId, reason) {
    const channel = bot.channels.get(channelId);

    if (channel?.guildId) {
      const guild = bot.guilds.get(channel.guildId);
      if (!guild) throw new Error("GUILD_NOT_FOUND");

      if (guild.rulesChannelId === channelId) throw new Error("RULES_CHANNEL_CANNOT_BE_DELETED");

      if (guild.publicUpdatesChannelId === channelId) throw new Error("UPDATES_CHANNEL_CANNOT_BE_DELETED");

      const isThread = [ChannelTypes.AnnouncementThread, ChannelTypes.PublicThread, ChannelTypes.PrivateThread]
        .includes(channel.type);

      requireBotGuildPermissions(bot, guild, isThread ? ["MANAGE_THREADS"] : ["MANAGE_CHANNELS"]);
    }

    return await deleteChannel(channelId, reason);
  };
}
