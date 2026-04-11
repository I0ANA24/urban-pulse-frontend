using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using UrbanPulse.Core.Entities;
using UrbanPulse.Infrastructure.Data;

namespace UrbanPulse.API.Hubs;

[Authorize]
public class SevereChatHub : Hub
{
    private readonly AppDbContext _context;

    public SevereChatHub(AppDbContext context)
    {
        _context = context;
    }

    public async Task SendMessage(string text)
    {
        var userIdClaim = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdClaim, out int userId)) return;

        var user = await _context.Users.FindAsync(userId);
        if (user == null) return;

        var message = new SevereMessage
        {
            SenderId = userId,
            Text = text,
            CreatedAt = DateTime.UtcNow,
        };

        _context.SevereMessages.Add(message);
        await _context.SaveChangesAsync();

        await Clients.All.SendAsync("NewSevereMessage", new
        {
            id = message.Id,
            text = message.Text,
            senderId = userId,
            senderFullName = user.FullName ?? user.Email,
            senderAvatarUrl = user.AvatarUrl,
            createdAt = message.CreatedAt,
        });
    }
}