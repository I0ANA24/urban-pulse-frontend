using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrbanPulse.Infrastructure.Data;

namespace UrbanPulse.API.Controllers;

[ApiController]
[Route("api/severe-chat")]
[Authorize]
public class SevereChatController : ControllerBase
{
    private readonly AppDbContext _context;

    public SevereChatController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("messages")]
    public async Task<IActionResult> GetMessages([FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        var messages = await _context.SevereMessages
            .Include(m => m.Sender)
            .OrderByDescending(m => m.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .OrderBy(m => m.CreatedAt)
            .Select(m => new
            {
                id = m.Id,
                text = m.Text,
                senderId = m.SenderId,
                senderFullName = m.Sender.FullName ?? m.Sender.Email,
                senderAvatarUrl = m.Sender.AvatarUrl,
                createdAt = m.CreatedAt,
            })
            .ToListAsync();

        return Ok(messages);
    }
}