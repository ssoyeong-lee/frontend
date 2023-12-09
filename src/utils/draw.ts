import { GameBallInfo, GameInfo, GameUserInfo } from "@/hooks/data/useGame";

function draw(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  info: GameInfo
) {
  ctx.clearRect(0, 0, width, height);

  drawBar(ctx, info.me);
  drawBar(ctx, info.oppense);
  drawBall(ctx, info.ball);

  requestAnimationFrame(() => draw(ctx, width, height, info));
}

function drawBar(ctx: CanvasRenderingContext2D, user: GameUserInfo) {
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(user.bar.x, user.bar.y, user.bar.width, user.bar.height);
}

function drawBall(ctx: CanvasRenderingContext2D, ball: GameBallInfo) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

export { draw };
