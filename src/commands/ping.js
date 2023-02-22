module.exports = {
	name: 'ping',
  description: 'replies with pong',
  execute(msg, args) {

    if (msg.member.roles.cache.has('1071266290288840734')) {
      msg.channel.send('pong')
    }else {
      msg.channel.send('Sorry, you dont have right permissions');
      // msg.reply('sup')
      // console.log(msg.member.roles.cache.some(role => role.name === 'Mod'));
      // msg.member.roles.add('').catch(console.error)
    }

    if ( msg.member.permissions.has('KICK_MEMBERS')){
      msg.channel.send('You have permission to kick members')
    }
  }
};
