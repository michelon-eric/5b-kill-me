﻿using Diplomacy;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Web.Models;
using Web.Utils;

namespace Web.Controllers {
	public class PlayersController : Controller {
		private readonly DatabaseContext context;
		private readonly Dictionary<string, GameHandler> gameHandlers;

		public PlayersController(DatabaseContext context, Dictionary<string, GameHandler> gameHandlers) {
			this.context = context;
			this.gameHandlers = gameHandlers;
		}

		// GET: Players
		public async Task<IActionResult> Index() {
			return context.Players != null ?
						View(await context.Players.ToListAsync()) :
						Problem("Entity set 'DatabaseContext.Players'  is null.");
		}

		// GET: Players/Details/5
		public async Task<IActionResult> Details(int? id) {
			if (id == null || context.Players == null) {
				return NotFound();
			}

			var players = await context.Players
				.FirstOrDefaultAsync(m => m.Id == id);
			if (players == null) {
				return NotFound();
			}

			return View(players);
		}

		// GET: StartGame
		public async Task<IActionResult> StartGame(int? id) {
			if (id == null || context.Players == null) {
				return NotFound();
			}
			List<Web.Models.Player> playerList = await context.Players.Where(m => m.IdTable == id).ToListAsync();
			if (playerList is null) {
				return RedirectToAction(nameof(Create));
			}
			List<PlayerModel> userList = new List<PlayerModel>();

			foreach (var player in playerList) {
				Models.User? user = await context.Users.FirstOrDefaultAsync(u => u.Id == player.IdUser);
				Models.Table? host = await context.Tables.FirstOrDefaultAsync(t => t.Id == player.IdTable);
				Models.Game? game = await context.Games.FirstOrDefaultAsync(t => t.IdTable == player.IdTable);
				if (user is not null && host is not null && game is not null) {
					userList.Add(new PlayerModel {
						Id = user.Id,
						IdTable = player.IdTable,
						IdGame = game.Id,
						Username = user.Username,
						PathImage = user.PathImage
					});
				}
			}
			return View(userList);
		}

		// GET: Players/Create
		public IActionResult Create() {
			return base.View(new UserPlayer {
				Id = new Random(Guid.NewGuid().GetHashCode()).Next(100000, 999999 + 1),
				IdTable = new Random(Guid.NewGuid().GetHashCode()).Next(100000, 999999 + 1),
				User = HttpContext.Session.Get<User>("User")?.Id // Get<User> returns User? so it could be null (if there's no "User" key stored it returns null)
					?? throw new Exception("you can only create a table when logged so go log in you dumbass")
			});
		}

		// POST: Players/Create
		// To protect from overposting attacks, enable the specific properties you want to bind to.
		// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Create([Bind("Id,IdTable,IdUser")] Web.Models.Player players) {
			int? userId = HttpContext.Session.Get<User>("User")?.Id;
			if (userId is null) return NotFound();
			//if (context.Players.AnyAsync(m => m.IdUser == userId && m.IdTable == players.IdTable).Result)
			//	return players is null ? this.JsonNotFound("players") : this.JsonRedirect(Url.Action("StartGame", new { id = players.IdTable })!);

			if (context.Players.AnyAsync(m => m.IdUser == userId && m.IdTable == players.IdTable).Result) {
				if (gameHandlers.TryGetValue(players.IdTable.ToString(), out GameHandler? handler)) {
					Diplomacy.Player? player = handler.Players.FirstOrDefault(player => player.UserId == userId);
					if (player is null) {
						List<Countries> availableCountries = Enum.GetValues<Countries>()
						.Where(country => !handler.Players.Any(player => player.Countries.Any(c => c.Name == country.ToString())))
						.ToList();

						Countries country = availableCountries[new Random(Guid.NewGuid().GetHashCode()).Next(0, availableCountries.Count)];
						(Country country, List<Unit> units) playerData = handler.CreatePlayerData(country);

						player = new Diplomacy.Player {
							UserId = userId,
							Name = context.Users.Find(userId)?.Username ?? "Unknown",
							Countries = new List<Country>() {
							playerData.country,
						},
							Units = playerData.units,
						};

						handler!.Players.Add(player);
					}
					HttpContext.Session.Set<string>($"{players.IdTable}-country", player.Countries[0].Name);
				}
				return players is null ? this.JsonNotFound("players") : this.JsonRedirect(Url.Action("StartGame", new { id = players.IdTable })!);
			}
			var playercount = context.Players.Count(m => m.IdTable == players.IdTable);
			if (playercount >= 7) {
				return this.JsonRedirect(nameof(Create));
			}
			if (ModelState.IsValid) {
				context.Add(new Models.Player {
					IdTable = players.IdTable,
					IdUser = (int)userId!,
				});
				await context.SaveChangesAsync();
				if (gameHandlers.TryGetValue(players.IdTable.ToString(), out GameHandler? handler)) {
					List<Countries> availableCountries = Enum.GetValues<Countries>()
						.Where(country => !handler.Players.Any(player => player.Countries.Any(c => c.Name == country.ToString())))
						.ToList();

					Countries country = availableCountries[new Random(Guid.NewGuid().GetHashCode()).Next(0, availableCountries.Count)];
					(Country country, List<Unit> units) playerData = handler.CreatePlayerData(country);

					handler!.Players.Add(new Diplomacy.Player {
						UserId = userId,
						Name = context.Users.Find(userId)?.Username ?? "Unknown",
						Countries = new List<Country>() {
							playerData.country,
						},
						Units = playerData.units,
					});
					HttpContext.Session.Set<string>($"{players.IdTable}-country", playerData.country.Name);
				}
				return players is null ? this.JsonNotFound("players") : this.JsonRedirect(Url.Action("StartGame", new { id = players.IdTable })!);
			}
			return View(players);
		}

		// GET: Players/Edit/5
		public async Task<IActionResult> Edit(int? id) {
			if (id == null || context.Players == null) {
				return NotFound();
			}

			var players = await context.Players.FindAsync(id);
			if (players == null) {
				return NotFound();
			}
			return View(players);
		}

		// POST: Players/Edit/5
		// To protect from overposting attacks, enable the specific properties you want to bind to.
		// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Edit(int id, [Bind("Id,IdTable,IdUser")] Web.Models.Player players) {
			if (id != players.Id) {
				return NotFound();
			}

			if (ModelState.IsValid) {
				try {
					context.Update(players);
					await context.SaveChangesAsync();
				} catch (DbUpdateConcurrencyException) {
					if (!PlayersExists(players.Id)) {
						return NotFound();
					} else {
						throw;
					}
				}
				return RedirectToAction(nameof(Index));
			}
			return View(players);
		}

		// GET: Players/Delete/5
		public async Task<IActionResult> Delete(int? id) {
			if (id == null || context.Players == null) {
				return NotFound();
			}

			var players = await context.Players
				.FirstOrDefaultAsync(m => m.Id == id);
			if (players == null) {
				return NotFound();
			}

			return View(players);
		}

		// POST: Players/Delete/5
		[HttpPost, ActionName("Delete")]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> DeleteConfirmed(int id) {
			if (context.Players == null) {
				return Problem("Entity set 'DatabaseContext.Players'  is null.");
			}
			var players = await context.Players.FindAsync(id);
			if (players != null) {
				context.Players.Remove(players);
			}

			await context.SaveChangesAsync();
			return RedirectToAction(nameof(Index));
		}

		private bool PlayersExists(int id) {
			return (context.Players?.Any(e => e.Id == id)).GetValueOrDefault();
		}
	}
}
