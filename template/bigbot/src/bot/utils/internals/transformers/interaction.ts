// SETUP-DD-TEMP: This file serves as an example, of how to customize internal discordeno objects. Feel free to use, add more or remove as desired.
import { InteractionResponse, InteractionResponseTypes } from "discordeno";
import { BotWithCustomProps } from "../../../bot.js";

export function customizeInteractionTransformer(bot: BotWithCustomProps) {
  // Store the internal transformer function
  const oldInteraction = bot.transformers.interaction;

  // Overwrite the internal function.
  bot.transformers.interaction = function (_, payload) {
    // Run the old function to get the internal value.
    const interaction = oldInteraction(bot, payload);

    // Add anything to this object. In this case we add a Interaction.reply() method.
    Object.defineProperty(interaction, "reply", {
      value: function (response: InteractionResponse | string) {
        if (typeof response === "string") {
          response = { type: InteractionResponseTypes.ChannelMessageWithSource, data: { content: response } };
        }
        return bot.helpers.sendInteractionResponse(interaction.id, interaction.token, response);
      },
    });
    // Add as many properties or methods you would like here.
    // NOTE: Whenever you add anything here, in order to get nice autocomplete you should also add it to the src/types/discordeno.ts file.

    // Return the new customized object.
    return interaction;
  };
}
