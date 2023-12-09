import { GameBallInfo, GameInfo, GameUserInfo } from "@/hooks/data/useGame";

function draw(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  info: GameInfo
) {
  ctx.clearRect(0, 0, width, height);

  drawBar(ctx, info.me, "me");
  drawBar(ctx, info.oppense, "oppense");
  drawBall(ctx, info.ball);

  requestAnimationFrame(() => draw(ctx, width, height, info));
}

function drawBar(
  ctx: CanvasRenderingContext2D,
  user: GameUserInfo,
  type: "me" | "oppense"
) {
  if (type === "me") {
    ctx.fillStyle = "#3691FC";
    ctx.fillRect(user.bar.x, user.bar.y, user.bar.width, user.bar.height);
  } else {
    ctx.fillStyle = "#FD5E5E";
    ctx.fillRect(user.bar.x, user.bar.y, user.bar.width, user.bar.height);
  }
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(
    user.bar.x + 1,
    user.bar.y + 1,
    user.bar.width - 1,
    user.bar.height - 1
  );
}

function drawBall(ctx: CanvasRenderingContext2D, ball: GameBallInfo) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFE500";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius - 0.5, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
}

export { draw };
