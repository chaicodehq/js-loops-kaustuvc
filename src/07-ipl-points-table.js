/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  const accArr = []
  if (!Array.isArray(matches) || matches.length === 0)
    return accArr
  
  for (let i = 0; i < matches.length; i++){
    let match = matches[i]
    let team1Index = accArr.findIndex(teamDetails => teamDetails.team ===  match.team1)
    let team2Index = accArr.findIndex(teamDetails => teamDetails.team === match.team2)
    if (team1Index === -1) {
      const acc = {
        team: match.team1,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0
      }
      accArr.push(acc)
      team1Index = accArr.findIndex(teamDetails => teamDetails.team === match.team1)
    }
    if (team2Index === -1) {
      const acc = {
        team: match.team2,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0
      }
      accArr.push(acc)
      team2Index = accArr.findIndex(teamDetails => teamDetails.team === match.team2)
    }
    
    accArr[team1Index].played += 1
    accArr[team2Index].played += 1
    
    switch (match.result.toLowerCase()) {
      case "win":
        if (match.team1 === match.winner) {
          accArr[team1Index].won += 1
          accArr[team1Index].points += 2
          accArr[team2Index].lost += 1
        } else {
          accArr[team2Index].won += 1
          accArr[team2Index].points += 2
          accArr[team1Index].lost += 1
        }
        break
      case "tie":
        accArr[team1Index].points += 1
        accArr[team2Index].points += 1
        accArr[team1Index].tied += 1
        accArr[team2Index].tied += 1
        break
      case "no_result":
        accArr[team1Index].points += 1
        accArr[team1Index].noResult += 1
        accArr[team2Index].points += 1
        accArr[team2Index].noResult += 1
        break
      default:
        break
    }
  }
  return accArr.toSorted((a, b) => b.points - a.points || a.team.localeCompare(b.team))
}
