import {
  GameBallInfo,
  GameInfo,
  GameStart,
  GameUserInfo,
} from "@/hooks/data/useGame";

function draw(
  ctx: CanvasRenderingContext2D,
  startInfo: GameStart,
  info: GameInfo
) {
  ctx.clearRect(0, 0, startInfo.canvasWidth, startInfo.canvasHeight);

  drawBar(ctx, info.me, "me");
  drawBar(ctx, info.opponent, "opponent");
  drawBall(ctx, info.ball);

  requestAnimationFrame(() => draw(ctx, startInfo, info));
}

function drawBar(
  ctx: CanvasRenderingContext2D,
  user: GameUserInfo,
  type: "me" | "opponent"
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
    user.bar.width - 2,
    user.bar.height - 2
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
