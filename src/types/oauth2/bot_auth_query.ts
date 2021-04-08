import { SnakeCasedPropertiesDeep } from "../util.ts";
import { DiscordOAuth2Scopes } from "./scopes.ts";

export interface BotAuthenticationFlowQuery {
  /** App's client id */
  clientId: string;
  /** Needs to include bot for the bot flow */
  scope: DiscordOAuth2Scopes[];
  /** The permissions you're requesting */
  permissions: string;
  /** Pre-fills the dropdown picker with a guild for the user */
  guildId: string;
  /** True or false—disallows the user from changing the guild dropdown */
  disableGuildSelect: boolean;
}

/** https://discord.com/developers/docs/topics/oauth2#bot-authorization-flow-bot-auth-parameters */
export type DiscordBotAuthenticationFlowQuery = SnakeCasedPropertiesDeep<
  BotAuthenticationFlowQuery
>;
