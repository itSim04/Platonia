import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from '../../linking/apis/answer.service';
import { FollowService } from '../../linking/apis/follow.service';
import { InterestService } from '../../linking/apis/interest.service';
import { LikeService } from '../../linking/apis/like.service';
import { PlatonService } from '../../linking/apis/platon.service';
import { ThoughtService } from '../../linking/apis/thought.service';
import { UserService } from '../../linking/apis/user.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {
  public folder!: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private thoughtService: ThoughtService, private interestService: InterestService, private followService: FollowService, private likeService: LikeService, private platonService: PlatonService, private answerServicer: AnswerService) { }

  ionViewWillEnter() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  trigger() {

    // this.userService.update_user({ user_id: 64, username: "Test", bio: "Hello", email: "TEST@gm.com", birthday: new Date(), gender: 0 }).subscribe(response => console.log(response));
    // this.userService.check({ username: "Test", email: "TEST@gm.com" }).subscribe(r => console.log(r));
    // this.userService.authenticate({ username: "itSim04", password: "Test1234" }).subscribe(r => console.log(r));

    // this.thoughtService.addThought({ content: "Hi", type: 0, owner_id: 10 }).subscribe(r => console.log(r));
    // this.thoughtService.getAll({ user_id: 9 }).subscribe(r => console.log(r));
    // this.thoughtService.getOne({ user_id: 9, thought_id: 9 }).subscribe(r => console.log(r));
    // this.thoughtService.getBy({ user_id: 9, owner_id: 9 }).subscribe(r => console.log(r));
    // this.thoughtService.update({ thought_id: 199, content: "Hello 2.0" }).subscribe(r => console.log(r));
    // this.thoughtService.delete({ thought_id: 199 }).subscribe(r => console.log(r));

    // this.interestService.addInterest({name: "Chemistry", img_src: ""}).subscribe(r => console.log(r));
    // this.interestService.getAll().subscribe(r => console.log(r));
    // this.interestService.getOne({ interest_id: 1 }).subscribe(r => console.log(r));
    // this.interestService.getUsers({ interest_id: 7 }).subscribe(r => console.log(r));
    // this.interestService.getInterestsOfUser({ user_id: 9 }).subscribe(r => console.log(r));
    // this.interestService.enrollUser({ user_id: 9, interest_id: 1 }).subscribe(r => console.log(r));

    // this.interestService.checkName({ name: "Coding" }).subscribe(r => console.log(r));
    // this.followService.follow(9, 60).subscribe(r => console.log(r));
    // this.followService.follow(10, 9).subscribe(r => console.log(r));
    // this.followService.getFollowers(9).subscribe(r => console.log(r));
    // this.followService.getFollowings(9).subscribe(r => console.log(r));

    // this.likeService.like(9, 9).subscribe(r => console.log(r));
    // this.likeService.unlike(9, 150).subscribe(r => console.log(r));
    // this.likeService.getLikesByUser(9).subscribe(r => console.log(r));
    // this.likeSerice.getLikesOnThought(150).subscribe(r => console.log(r));

    // this.platonService.platon(15, 150).subscribe(r => console.log(r));
    // this.platonService.unplaton(15, 150).subscribe(r => console.log(r));
    // this.platonService.getPlatonsByUser(9).subscribe(r => console.log(r));
    // this.platonService.getPlatonsOnThought(150).subscribe(r => console.log(r));

    //this.answerServicer.answer_poll(9, 200, 2).subscribe(r => console.log(r));
    this.answerServicer.get_option(200).subscribe(r => console.log(r));

  }

}
