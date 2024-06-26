﻿
namespace Diplomacy.Orders;

public class HoldOrder : Order {
	public override void Resolve() { }

	public override void ResolveFailed() {
		if (Status == OrderStatus.Retired) {
			Unit.Location = null;
		}
	}

	public override void Execute(Dictionary<Order, List<Order>>? dependencyGraph, Order? forwardDependency) {
		Status = OrderStatus.Succeeded;
	}

	public override string ToString() => ToString("holds");
}
