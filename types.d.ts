import {
    Client,
    PermissionFlags,
    ChannelType,
    ChatInputCommandInteraction,
    Message,
    SlashCommandBuilder
} from 'discord.js'

export declare type CommandData = {
    name: string
    type: {
        command: boolean
        text: boolean
    }
    data?: SlashCommandBuilder
    execute?: (client: Client, interaction: ChatInputCommandInteraction) => void,
    messageExecute?: (client: Client, message: Message, args: Array<string?> | undefined) => void
    requiredPermissions?: PermissionFlags
    channelLimits?: Array<ChannelType>
    triggers?: Array<string>
    disabled?: boolean
}