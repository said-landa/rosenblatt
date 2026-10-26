import MachinesGeometry
import simd
import Testing

struct GeometryTests {
    @Test func boxHasExpectedTopologyAndBounds() {
        let mesh = MeshBuilder.box(BoxRecipe(size: SIMD3(2, 4, 6)))
        #expect(mesh.vertices.count == 24)
        #expect(mesh.indices.count == 36)
        #expect(mesh.bounds?.minimum == SIMD3(-1, -2, -3))
        #expect(mesh.bounds?.maximum == SIMD3(1, 2, 3))
    }

    @Test func shackleIsSymmetricAndNormalsAreUnitLength() {
        let recipe = ReferencePadlock01.shackle
        let mesh = MeshBuilder.shackle(recipe)
        let bounds = mesh.bounds
        #expect(bounds != nil)
        #expect(abs(bounds!.minimum.x + bounds!.maximum.x) < 0.0001)
        #expect(abs(bounds!.minimum.y) < 0.0001)
        #expect(mesh.vertices.allSatisfy { abs(simd_length($0.normal) - 1) < 0.0001 })
        #expect(!mesh.indices.isEmpty)
    }

    @Test func insertionConstraintClampsAndSnaps() {
        let constraint = ReferencePadlock01.insertion
        #expect(constraint.clampedProgress(-1) == 0)
        #expect(constraint.clampedProgress(2) == 1)
        #expect(constraint.verticalOffset(progress: 0) == constraint.explodedOffset)
        #expect(constraint.verticalOffset(progress: 1) == 0)
        #expect(constraint.releasedTarget(progress: 0.77) == 0)
        #expect(constraint.releasedTarget(progress: 0.78) == 1)
    }
}
